//#include <stdio.h>
//#include <GLES2/gl2.h>
#include <string>
#include <iostream>
#include <fstream>

#include "md5.h"
#include "SDL.h"
#include "SDL_ttf.h"
#include "SDL_image.h"
#include "PDL.h"

using namespace std;
extern "C" {
	#include "coremark.h"
	#include "curl.h"
}

int request (char* hostname, char* api, char* parameters, std::string& message);

#pragma comment(lib, "ws2_32.lib")

#define version "0.0.5"
#define theMotzo "Maobtczdoe fhgihyiajtkzlambnoo!p!q1r" //used for sloppily hashing the upload data

class Entity{
public:
	SDL_Surface* surface;
	SDL_Rect position;
};

/**
*	SURFACES
**/
SDL_Surface* screen;
Entity numbers[10];
SDL_Surface* fontSurface;

Entity about[2];
Entity help[2];
Entity helpMenu;
Entity aboutMenu;
Entity uploadMenu[2];
Entity run[2];
Entity flames;
Entity scorehead;
Entity tagline;
Entity title;
Entity paper;
Entity benchResults[10];
Entity no;
Entity yes;
Entity uploadDialog;
Entity benchmarkRunning;
Entity uploadProgress;
Entity statsLink;

SDL_Rect innerRect;
SDL_Rect imgRect;
SDL_Color fColor;
SDL_Event Event;

bool runEnabled = false; //Enabled if benchmark is running
bool helpEnabled = false;	//Enabled if help menu is showing
bool aboutEnabled = false;	//enabled if about menu is showing
bool benchmarkHasRun = false;	//Enabled if the benchmark has ran and results haven't been submitted
bool uploadEnabled = false;	//Enabled when the user has the option of uploading score
bool uploadDialogEnabled = false; //enabled when the user has clicked the upload button
bool uploadFailed = false; //Enabled when an upload is in progress
bool needUpdate = true;	//Enabled when a redraw is needed

PDL_ScreenMetrics screenMetrics;

char deviceID[60];
TTF_Font* font;
char text[60];
float result;

std::ifstream file;

//HTTP post stuff
std::string postStatus;
std::string postParams;


void fontInit(){
	TTF_Init();
	font = TTF_OpenFont("arial.ttf", 12);
	fColor.r = 0;
	fColor.g = 0;
	fColor.b = 0;
}


void printF(char c[], int x, int y){
	fontSurface = TTF_RenderText_Solid(font, c, fColor);
	imgRect.x = x;
	imgRect.y = y;
	SDL_BlitSurface(fontSurface, NULL, screen, &imgRect);
	SDL_Flip(screen);
}


void drawMainScene(){
	SDL_BlitSurface(paper.surface, NULL, screen, &paper.position);
	SDL_BlitSurface(title.surface, NULL, screen, &title.position);
	SDL_BlitSurface(tagline.surface, NULL, screen, &tagline.position);
	SDL_BlitSurface(flames.surface, NULL, screen, &flames.position);
	SDL_BlitSurface(scorehead.surface, NULL, screen, &scorehead.position);
	SDL_BlitSurface(statsLink.surface, NULL, screen, &statsLink.position);

	if(benchmarkHasRun){
		//benchmarkHasRun = false;
		for(int i = 0; i < 10; i++){
			if(benchResults[i].surface == NULL)
				break;
			SDL_BlitSurface(benchResults[i].surface, NULL, screen, &benchResults[i].position);
		}

		//draw the upload button
		if(uploadEnabled)
			SDL_BlitSurface(uploadMenu[0].surface, NULL, screen, &uploadMenu[0].position);
			//SDL_BlitSurface(uploadMenu[1].surface, NULL, screen, &uploadMenu[1].position);
		//else
	}

	if(runEnabled){
		SDL_BlitSurface(run[1].surface, NULL, screen, &run[1].position);
		SDL_BlitSurface(benchmarkRunning.surface, NULL, screen, &benchmarkRunning.position);
	}
	else{
		SDL_BlitSurface(run[0].surface, NULL, screen, &run[0].position);
	}
	
	if(aboutEnabled){
		SDL_BlitSurface(about[1].surface, NULL, screen, &about[1].position);
	}
	else{
		SDL_BlitSurface(about[0].surface, NULL, screen, &about[0].position);
	}
	
	if(helpEnabled){
		SDL_BlitSurface(help[1].surface, NULL, screen, &help[1].position);
	}
	else{
		SDL_BlitSurface(help[0].surface, NULL, screen, &help[0].position);
	}
}

void display(){
	needUpdate = false;

	if(helpEnabled){
		SDL_BlitSurface(helpMenu.surface, NULL, screen, &helpMenu.position);
		SDL_BlitSurface(help[1].surface, NULL, screen, &help[1].position);
	}
	else if (aboutEnabled){
		SDL_BlitSurface(paper.surface, NULL, screen, &paper.position);
		SDL_BlitSurface(title.surface, NULL, screen, &title.position);
		SDL_BlitSurface(tagline.surface, NULL, screen, &tagline.position);
		SDL_BlitSurface(flames.surface, NULL, screen, &flames.position);
		SDL_BlitSurface(scorehead.surface, NULL, screen, &scorehead.position);
		SDL_BlitSurface(aboutMenu.surface, NULL, screen, &aboutMenu.position);
		SDL_BlitSurface(about[1].surface, NULL, screen, &about[1].position);
	}
	else if(uploadDialogEnabled){
		//Create a rectangle that only covers the inside of the screen
		/*
		innerRect = uploadDialog.position;
		innerRect.x -= 10;
		innerRect.y += 10;
		innerRect.w = uploadDialog.surface->w;
		innerRect.h = uploadDialog.surface->h;
		*/

		//SDL_FillRect(screen, &innerRect, 0x000000);
		SDL_BlitSurface(uploadDialog.surface, NULL, screen, &uploadDialog.position);
		SDL_BlitSurface(yes.surface, NULL, screen, &yes.position);
		SDL_BlitSurface(no.surface, NULL, screen, &no.position);

		printF("Kernel Version", uploadDialog.position.x + 20, uploadDialog.position.y + 70);
		printF("Hashed Device ID", uploadDialog.position.x + 20, uploadDialog.position.y + 90);
		printF("Benchmark Result", uploadDialog.position.x + 20, uploadDialog.position.y + 110);
		printF("Hardware Type (Pre/Pixi)", uploadDialog.position.x + 20, uploadDialog.position.y + 130);
		
		if(uploadFailed)
			printF("The upload failed! Try again?", uploadDialog.position.x + 40, uploadDialog.position.y + 150);

	}
	else{
		drawMainScene();
	}

	/*

	if(aboutEnabled){
		SDL_BlitSurface(about[1].surface, NULL, screen, &about[1].position);
	}
	else{
		SDL_BlitSurface(about[0].surface, NULL, screen, &about[0].position);
	}
	*/
	
	SDL_Flip(screen);
}

int loadImages(){

	numbers[0].surface = IMG_Load("0.png");
	numbers[1].surface = IMG_Load("1.png");
	numbers[2].surface = IMG_Load("2.png");
	numbers[3].surface = IMG_Load("3.png");
	numbers[4].surface = IMG_Load("4.png");
	numbers[5].surface = IMG_Load("5.png");
	numbers[6].surface = IMG_Load("6.png");
	numbers[7].surface = IMG_Load("7.png");
	numbers[8].surface = IMG_Load("8.png");
	numbers[9].surface = IMG_Load("9.png");

	helpMenu.surface = IMG_Load("help.png");
	helpMenu.position.x = 0;
	helpMenu.position.y = 0;

	aboutMenu.surface = IMG_Load("about.png");
	aboutMenu.position.x = screen->w/2 - aboutMenu.surface->w/2;
	aboutMenu.position.y = screen->h/2 - aboutMenu.surface->h/2;

	paper.surface = IMG_Load("paper.png");
	if(paper.surface == NULL)
		return -1;
	paper.position.x = 0;
	paper.position.y = 0;

	title.surface = IMG_Load("title.png");
	if(title.surface == NULL)
		return -1;
	title.position.x = 320/2 - title.surface->w/2;
	title.position.y = 10;

	tagline.surface = IMG_Load("tagline.png");
	if(tagline.surface == NULL)
		return -1;
	tagline.position.x = 320/2 - tagline.surface->w/2;
	tagline.position.y = title.position.y + title.surface->h + 10;

	flames.surface = IMG_Load("flames.png");
	if(flames.surface == NULL)
		return -1;
	flames.position.x = 20;
	flames.position.y = tagline.position.y;

	scorehead.surface = IMG_Load("scorehead.png");
	if(scorehead.surface == NULL)
		return -1;
	scorehead.position.x = 320/2 - scorehead.surface->w/2;;
	scorehead.position.y = flames.position.y + flames.surface->h + 10;

	uploadMenu[0].surface = IMG_Load("upload0.png");
	uploadMenu[1].surface = IMG_Load("upload1.png");
	if(uploadMenu[0].surface == NULL || uploadMenu[1].surface == NULL)
		return -1;
	uploadMenu[0].position.x = 320/2 - uploadMenu[0].surface->w/2;
	uploadMenu[0].position.y = scorehead.position.y + scorehead.surface->h + 10;
	uploadMenu[1].position.x = 320/2 - uploadMenu[1].surface->w/2;
	uploadMenu[1].position.y = scorehead.position.y + scorehead.surface->h + 10;

/*	dragonText.surface = IMG_Load("dragontext.png");
	if(dragonText.surface == NULL)
		return -1;
	dragonText.position.x = 320/2 - dragonText.surface->w/2;
	dragonText.position.y = scorehead.position.y + scorehead.surface->h + 10;
*/

	run[0].surface = IMG_Load("run0.png");
	if(run[0].surface == NULL)
		return -1;
	run[0].position.x = 320/2 - run[0].surface->w/2;
	run[0].position.y = screen->h - run[0].surface->h - 10;

	run[1].surface = IMG_Load("run1.png");
	if(run[1].surface == NULL)
		return -1;
	run[1].position.x = 320/2 - run[1].surface->w/2;
	run[1].position.y = screen->h - run[1].surface->h - 10;

	about[0].surface = IMG_Load("about0.png");
	if(about[0].surface == NULL)
		return -1;
	about[0].position.x = 5*320/6 - about[0].surface->w/2;
	about[0].position.y = screen->h - about[0].surface->h - 10;

	about[1].surface = IMG_Load("about1.png");
	if(about[1].surface == NULL)
		return -1;
	about[1].position.x = 5*320/6 - about[1].surface->w/2;
	about[1].position.y = screen->h - about[1].surface->h - 10;

	help[0].surface = IMG_Load("help0.png");
	if(about[0].surface == NULL)
		return -1;
	help[0].position.x = 320/6 - help[0].surface->w/2;
	help[0].position.y = screen->h - help[0].surface->h - 10;

	help[1].surface = IMG_Load("help1.png");
	if(about[0].surface == NULL)
		return -1;
	help[1].position.x = 320/6 - help[1].surface->w/2;
	help[1].position.y = screen->h - help[1].surface->h - 10;

	yes.surface = IMG_Load("yes.png");
	if(yes.surface == NULL)
		return -1;

	no.surface = IMG_Load("no.png");
	if(no.surface == NULL)
		return -1;

	uploadDialog.surface = IMG_Load("uploadd.png");
	if(uploadDialog.surface == NULL)
		return -1;

	uploadDialog.position.x = screen->w/2 - uploadDialog.surface->w/2;
	uploadDialog.position.y = screen->h/2 - uploadDialog.surface->h/2;

	yes.position.x = uploadDialog.position.x + uploadDialog.surface->w - yes.surface->w - 10;
	yes.position.y = uploadDialog.position.y + uploadDialog.surface->h - yes.surface->h - 10;
	
	no.position.x = uploadDialog.position.x + 10;
	no.position.y = uploadDialog.position.y + uploadDialog.surface->h - no.surface->h - 10;

	benchmarkRunning.surface = IMG_Load("running.png");
	if(benchmarkRunning.surface == NULL)
		return -1;

	benchmarkRunning.position.x = screen->w/2 - benchmarkRunning.surface->w/2;
	benchmarkRunning.position.y = screen->h/2 - benchmarkRunning.surface->h/2;

	uploadProgress.surface = IMG_Load("progress.png");
	if(uploadProgress.surface == NULL)
		return -1;
	uploadProgress.position.x = screen->w/2 - uploadProgress.surface->w/2;
	uploadProgress.position.y = screen->h/2 - uploadProgress.surface->h/2;
	
	statsLink.surface = IMG_Load("stats.png");
	if(statsLink.surface == NULL)
		return -1;
	statsLink.position.x = screen->w - statsLink.surface->w - 10;
	statsLink.position.y = 50;

	return 0;
}


bool isPointInRect(SDL_Rect r, Uint16 x, Uint16 y){
	return (r.x <= x)
		&& (x <= r.x + r.w)
		&& (r.y <= y)
		&& (y <= r.y + r.h);	 
}

PDL_bool cpuInfoCallback(PDL_ServiceParameters *params, void *user){
	std::cout << "We made it!" << std::endl;
	
	if(PDL_ParamExists(params, "cpuinfo_cur_freq")){
		std::cout << "cpu freq exists!" << std::endl;
	}
	if(PDL_ParamExists(params, "returnValue")){
		std::cout << "returnValue exists" << std::endl;
	}
	if(PDL_ParamExists(params, "governor")){
		std::cout << "governor exists!" << std::endl;
	}
	if(PDL_ParamExists(params, "params")){
		std::cout << "params exists!" << std::endl;
	}
	char buffer[500];
	PDL_GetParamString(params, "params", buffer, 500);
	
	
	std::cout << buffer << std::endl;
	
}

PDL_bool serviceCallback(PDL_ServiceParameters *params, void *user){
	//bool returnValue;
	//char value[10];
	if (PDL_ParamExists(params, "errorText"))              
	{              
		PDL_ServiceCall("palm://com.palm.applicationManager/launch",                       
			"{ \"id\":\"com.palm.app.findapps\", \"params\": { \"scene\": \"page\", \"target\":\"http://developer.palm.com/appredirect/?packageid=com.wordpress.mobilecoder.webosmarkstats\"}}");            
	}               
//	else               
//	{               
//		fprintf(stdout, "Did not get return value\n");              
//	}               
	/*
	return PDL_TRUE;             
	//PDL_Err err = PDL_ServiceCall("palm://com.palm.applicationManager/launch",                       
          //                         "{ \"id\":\"com.wordpress.mobilecoder.webosmarkstats\"}");
		
		std::cout << err << std::endl;
		if(err != PDL_NOERROR)
			PDL_ServiceCall("palm://com.palm.applicationManager/launch",                       
							"{ \"id\":\"com.palm.app.findapps\", \"params\": { \"scene\": \"page\", \"target\":\"http://developer.palm.com/appredirect/?packageid=com.wordpress.mobilecoder.webosmarkstats\"}}");
							*/
}
void doCollision(SDL_Event e){
	needUpdate = false;
	
	if(isPointInRect(title.position, e.button.x, e.button.y)){
		
		PDL_Err err = PDL_ServiceCallWithCallback("palm://com.palm.applicationManager/launch",     
		"{ \"id\":\"com.wordpress.mobilecoder.webosmarkstats\"}",
		serviceCallback,
		NULL,
		PDL_TRUE);		
	}
	
	//Help
	if(helpEnabled && !aboutEnabled && !runEnabled && !uploadDialogEnabled){
		if(isPointInRect(help[1].position, e.button.x, e.button.y)){
			helpEnabled = false;
			needUpdate = true;
			return;
		}
	}
	else if(!aboutEnabled && !runEnabled && !uploadDialogEnabled){
		if(isPointInRect(help[0].position, e.button.x, e.button.y)){
			helpEnabled = true;
			needUpdate = true;
			return;
		}
	}

	//About
	if(aboutEnabled && !helpEnabled && !runEnabled && !uploadDialogEnabled){
		if(isPointInRect(about[1].position, e.button.x, e.button.y)){
			aboutEnabled = false;
			needUpdate = true;
			return;
		}
	}
	else if(!helpEnabled && !runEnabled && !uploadDialogEnabled){
		if(isPointInRect(about[0].position, e.button.x, e.button.y)){
			aboutEnabled = true;
			needUpdate = true;
			return;
		}
	}

	//Go
	if(!runEnabled && !helpEnabled && !aboutEnabled && !uploadDialogEnabled){
		if(isPointInRect(run[0].position, e.button.x, e.button.y)){
			runEnabled = true;
			needUpdate = true;
			return;
		}
	}
	//Upload
	if(uploadEnabled && !helpEnabled && !aboutEnabled && !runEnabled){
		if(isPointInRect(uploadMenu[0].position, e.button.x, e.button.y)){
			uploadDialogEnabled = true;
			needUpdate = true;
			return;
		}
	}
	
	//Upload dialog
	if(uploadDialogEnabled && !runEnabled && !aboutEnabled && !helpEnabled){
		if(isPointInRect(yes.position, e.button.x, e.button.y)){
			//Display upload dialog
			SDL_BlitSurface(uploadProgress.surface, NULL, screen, &uploadProgress.position);
			SDL_Flip(screen);

			//Get score
			char temp[10];
			sprintf(temp, "%2.1f", result);

			//Get kernel version
			char kernel[500];
			file.open("/proc/version",std::ios::in);
			if(file.is_open()){			
				file.getline(kernel,500);						
			}
			file.close();		
			
			//Build secret
			std::string secret;
			secret.append(temp);
			secret.append(PDL_GetHardware());
			
			for(int i = 0; i < 37; i+=2){
				secret.append(theMotzo, i, 1);
			}

			//Stuff params
			postParams.clear();
			postParams.append("&score=");
			postParams.append(temp);
			postParams.append("&kernel=");
			postParams.append(kernel);
			postParams.append("&deviceID=");			
			postParams.append(md5(deviceID));
			postParams.append("&model=");
			postParams.append(PDL_GetHardware());
			postParams.append("&version=");
			postParams.append(version);
			postParams.append("&secretcode=");
			postParams.append(md5(secret));			

			CURL *curl;
			CURLcode res;
			curl = curl_easy_init();
			if(curl){
				curl_easy_setopt(curl, CURLOPT_URL, "http://webosmark.appspot.com/rest");
				curl_easy_setopt(curl, CURLOPT_POSTFIELDS, (char *)postParams.c_str());
				res = curl_easy_perform(curl);
				curl_easy_cleanup(curl);
			}

			if(res == 0){
				uploadEnabled = false;
				uploadDialogEnabled = false;
				benchmarkHasRun = true;
				needUpdate = true;
				uploadFailed = false;
			}
			else{
				//Upload failed alert
				uploadFailed = true;
				needUpdate = true;
			}
		}
		else if(isPointInRect(no.position, e.button.x, e.button.y)){
			uploadDialogEnabled = false;
			needUpdate = true;
		}
	}
}

void doBenchmark(){
	//Run the benchmark
	result = runBenchmark();
	runEnabled = false;
	benchmarkHasRun = true;
	uploadEnabled = true;

	//Convert the result to a string
	char ra[10];
	sprintf(ra, "%2.1f", result);

	//Loop through the results
	for(int i = 0; i < 10; i++){
		//Until we find a decimal
		if(ra[i] == '.'){
			benchResults[i].surface = NULL;
			break;
		}

		//Store the appropriate surface in our results
		if(ra[i] == '0')
			benchResults[i].surface = numbers[0].surface;
		else if(ra[i] == '1')
			benchResults[i].surface = numbers[1].surface;
		else if(ra[i] == '2')
			benchResults[i].surface = numbers[2].surface;
		else if(ra[i] == '3')
			benchResults[i].surface = numbers[3].surface;
		else if(ra[i] == '4')
			benchResults[i].surface = numbers[4].surface;
		else if(ra[i] == '5')
			benchResults[i].surface = numbers[5].surface;
		else if(ra[i] == '6')
			benchResults[i].surface = numbers[6].surface;
		else if(ra[i] == '7')
			benchResults[i].surface = numbers[7].surface;
		else if(ra[i] == '8')
			benchResults[i].surface = numbers[8].surface;
		else if(ra[i] == '9')
			benchResults[i].surface = numbers[9].surface;

		//Set the position
		if(i == 0)
			benchResults[i].position.x = 320/2 - benchResults[i].surface->w/2 - benchResults[i].surface->w - 10; 
		else
			benchResults[i].position.x = benchResults[i-1].position.x + benchResults[i-1].surface->w + 10;

		benchResults[i].position.y = scorehead.position.y + scorehead.surface->h - 25;
	}
}

int main(int argc, char** argv)
{
    // Initialize the SDL library with the Video subsystem
    SDL_Init(SDL_INIT_VIDEO | SDL_INIT_NOPARACHUTE);

	// start the PDL library
    PDL_Init(0);

	/*
	PDL_Err cpuErr = PDL_ServiceCallWithCallback("palm://org.webosinternals.govnah/get_cpufreq_params",     
		"",
		cpuInfoCallback,
		NULL,
		PDL_TRUE);
	*/
	PDL_Err err = PDL_GetScreenMetrics(&screenMetrics);

	if(err == PDL_INVALIDINPUT)
		return -2;
	if(err == PDL_EOTHER)
	    screen = SDL_SetVideoMode(320, 480, 0, SDL_SWSURFACE);
	else 
		screen = SDL_SetVideoMode(320, 400, 0, SDL_SWSURFACE);
		//screen = SDL_SetVideoMode(screenMetrics.horizontalPixels, screenMetrics.verticalPixels, 0, SDL_SWSURFACE);
	if(loadImages() != 0)
		return -1;    

	PDL_GetUniqueID(deviceID, 64);

	fontInit();

	//Draw the intro screen
	display();    

    do {
        // Process the events
        while (SDL_PollEvent(&Event)) {
            switch (Event.type) {
                
				case SDL_MOUSEBUTTONDOWN:
					doCollision(Event);
					break;

                case SDL_KEYDOWN:
                    switch (Event.key.keysym.sym) {
                        // Escape forces us to quit the app
                        // this is also sent when the user makes a back gesture
                        case SDLK_ESCAPE:
                            Event.type = SDL_QUIT;
                            break;

                        default:
                            break;
                    }
                    break;

                default:
                    break;
            }
        }
		//We always update the display first
		if(needUpdate){
			display();

			//If runEnabled then we run the benchmark and update the display
			if(runEnabled){
				doBenchmark();
				display();
			}
		}

		SDL_Delay(10);
    } while (Event.type != SDL_QUIT);

    // Cleanup
    PDL_Quit();
    SDL_Quit();

    return 0;
}
