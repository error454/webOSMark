package com.wordpress.mobilecoder.webosmark.stats;

//import org.apache.commons.fileupload.FileItemIterator;
//import org.apache.commons.fileupload.FileItemStream;
//import org.apache.commons.fileupload.servlet.ServletFileUpload;
//import org.apache.commons.io.IOUtils;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Logger;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.jdo.Transaction;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.Blob;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

import flexjson.JSONSerializer;

public class WebOSMark_REST extends HttpServlet {
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
		
		//Get the URI that was requested
		String requestURI = req.getRequestURI();		
		
		/*
		 * Get Benchmarks
		 */
		
		if(requestURI.indexOf("/rest") != -1){
			//Get a reference to the persistence manager
			PersistenceManager persistenceManager = JDOUtil.persistenceManagerFactory.getPersistenceManager();
					
			String objectQuery = URLDecoder.decode(requestURI.substring(requestURI.lastIndexOf("/") + 1), "UTF-8");
			
			//Initialize query and collection
			Collection collection = null;
			
			//TOTALS
			if(objectQuery.contentEquals("totals")){
				Query pixiQuery = persistenceManager.newQuery("select model from " + Score.class.getName() + " where model == :p1");
				Query totalQuery = persistenceManager.newQuery("select model from " + Score.class.getName());
				Query uniqueQuery = persistenceManager.newQuery("select key from " + Device.class.getName());
				Key pixiKey = KeyFactory.createKey(Model.class.getSimpleName(), "pixi");
				Key preKey = KeyFactory.createKey(Model.class.getSimpleName(), "pre");
				Key totalKey = KeyFactory.createKey(Model.class.getSimpleName(), "*");
				
				List<Key> pixiResults = (List<Key>) pixiQuery.execute(pixiKey);
				List<Key> preResults = (List<Key>) pixiQuery.execute(preKey);
				List<Key> totalResults = (List<Key>) totalQuery.execute();
				List<Key> uniqueResults = (List<Key>) uniqueQuery.execute(); 
			
				int pre = 0;
				int pixi = 0;
				int other = 0;
				int unique = 0;
				
				if(!pixiResults.isEmpty()){
					pixi = pixiResults.size();
				}
				if(!preResults.isEmpty()){
					pre = preResults.size();
				}
				if(!totalResults.isEmpty()){
					other = totalResults.size() - pixi - pre;
				}
				if(!uniqueResults.isEmpty()){
					unique = uniqueResults.size();
				}
				
				//Create a new serializer
				JSONSerializer serializer = new JSONSerializer();
				
				/*
				for(int i = 0; i < results.size(); i++){
					String temp = results.get(i).getModel();
					if(temp.contentEquals("pre"))
						pre++;
					else if(temp.contentEquals("pixi"))
						pixi++;
					else
						other++;
				}
				*/
				
				ScoreTotals st = new ScoreTotals();
				st.setPre(pre);
				st.setPixi(pixi);
				st.setOther(other);
				st.setUnique(unique);
				
				/*
				Query query2 = persistenceManager.newQuery("select DISTINCT deviceID from " + Score.class.getName());
				results = (List<Score>) query2.execute();
				if(!results.isEmpty()){
					st.setUnique(results.size());
				}
				*/
				
				//Set content type
				resp.setContentType("application/json");
				resp.setHeader("Content-type", "application/json");
				resp.getWriter().write(serializer.exclude("*.class").serialize(st));
				
				
			}
			//Top 5
			else if(objectQuery.contentEquals("top")){
				
				Query query = persistenceManager.newQuery(
						"select FROM " + Score.class.getName()
						+ " where model == :p1 order by score desc");				
				query.setRange(0, 5);
				Query kernelQuery = persistenceManager.newQuery(
						"select FROM " + Kernel.class.getName()
						+ " where model == :p1 order by score desc");	
				
				Key pixiKey = KeyFactory.createKey(Model.class.getSimpleName(), "pixi");
				Key preKey = KeyFactory.createKey(Model.class.getSimpleName(), "pre");
				List<Score> pixiResults = (List<Score>) query.execute(pixiKey);
				List<Score> preResults = (List<Score>) query.execute(preKey);
				
				List<Toppers> toppers = new ArrayList<Toppers>();
				
				if(!pixiResults.isEmpty()){
					for(int i = 0; i < pixiResults.size(); i++){
						Toppers temp = new Toppers();
						temp.setDevice("pixi");
						temp.setKey(pixiResults.get(i).getKey().getId());
						temp.setScore(pixiResults.get(i).getScore());
						toppers.add(temp);
					}
				}
				
				if(!preResults.isEmpty()){
					for(int i = 0; i < preResults.size(); i++){
						Toppers temp = new Toppers();
						temp.setDevice("pre");
						temp.setKey(preResults.get(i).getKey().getId());
						temp.setScore(preResults.get(i).getScore());
						toppers.add(temp);
					}
				}
				
				JSONSerializer serializer = new JSONSerializer();

				//Set content type
				resp.setContentType("application/json");
				resp.setHeader("Content-type", "application/json");
				resp.getWriter().write(serializer.exclude("*.class").serialize(toppers));
				
			}
			else if(objectQuery.contentEquals("full")){
				String scoreKey = req.getParameter("key");
				Query query = persistenceManager.newQuery(
						"select FROM " + Score.class.getName()
						+ " where key == :p1");
				Key key = KeyFactory.createKey(Score.class.getSimpleName(), Integer.parseInt(scoreKey));
				
				List<Score> results = (List<Score>) query.execute(key);
				if(results.size() == 1){
					JSONSerializer serializer = new JSONSerializer();
					
					//Query the keys
					//device id
					Query deviceQuery = persistenceManager.newQuery(
							"select FROM " + Device.class.getName() + " where key == :p1");
					Query kernelQuery = persistenceManager.newQuery(
							"select FROM " + Kernel.class.getName() + " where key == :p1");
					Query modelQuery = persistenceManager.newQuery(
							"select FROM " + Model.class.getName() + " where key == :p1");
					Query versionQuery = persistenceManager.newQuery(
							"select FROM " + Version.class.getName() + " where key == :p1");
					
					List<Device> device = (List<Device>) deviceQuery.execute(results.get(0).getDeviceID());
					List<Kernel> kernel = (List<Kernel>) kernelQuery.execute(results.get(0).getKernel());
					List<Model> model = (List<Model>) modelQuery.execute(results.get(0).getModel());
					List<Version> version = (List<Version>) versionQuery.execute(results.get(0).getVersion());
					
					if(device.size() != 1 || kernel.size() != 1|| model.size() != 1 || version.size() != 1)
						return;
					
					FullDetails output = new FullDetails();
					output.setDeviceID(device.get(0).getDevice());
					//output.setDeviceIDKey(device.get(0).getKey().getId());
					output.setKernel(kernel.get(0).getKernel());
					output.setModel(model.get(0).getModel());
					output.setVersion(version.get(0).getVersion());
					output.setScore(results.get(0).getScore());
					
					//Set content type
					resp.setContentType("application/json");
					resp.setHeader("Content-type", "application/json");
					resp.getWriter().write(serializer.exclude("*.class").serialize(output));
				}
			}
			else if(objectQuery.contentEquals("device")){
				Query query = persistenceManager.newQuery(
						"select FROM " + Score.class.getName()
						+ " where deviceID == :p1");
				Key deviceKey = KeyFactory.createKey(Device.class.getSimpleName(), req.getParameter("deviceID"));
				
				List<Score> results = (List<Score>) query.execute(deviceKey);
				if(results.size() > 0){
					
					//Query the keys
					//device id
					Query deviceQuery = persistenceManager.newQuery(
							"select FROM " + Device.class.getName() + " where key == :p1");
					Query kernelQuery = persistenceManager.newQuery(
							"select FROM " + Kernel.class.getName() + " where key == :p1");
					Query modelQuery = persistenceManager.newQuery(
							"select FROM " + Model.class.getName() + " where key == :p1");
					Query versionQuery = persistenceManager.newQuery(
							"select FROM " + Version.class.getName() + " where key == :p1");
					
					List<FullDetails> output = new ArrayList<FullDetails>();
					
					for(int i = 0; i < results.size(); i++){
						List<Device> device = (List<Device>) deviceQuery.execute(results.get(i).getDeviceID());
						List<Kernel> kernel = (List<Kernel>) kernelQuery.execute(results.get(i).getKernel());
						List<Model> model = (List<Model>) modelQuery.execute(results.get(i).getModel());
						List<Version> version = (List<Version>) versionQuery.execute(results.get(i).getVersion());
						
						if(device.size() != 1 || kernel.size() != 1|| model.size() != 1 || version.size() != 1)
							return;

						FullDetails temp = new FullDetails();
						temp.setDeviceID(device.get(0).getDevice());
						//output.setDeviceIDKey(device.get(0).getKey().getId());
						temp.setKernel(kernel.get(0).getKernel());
						temp.setModel(model.get(0).getModel());
						temp.setVersion(version.get(0).getVersion());
						temp.setScore(results.get(i).getScore());
						temp.setKey(results.get(i).getKey().getId());
						output.add(temp);
					}
					JSONSerializer serializer = new JSONSerializer();

					//Set content type
					resp.setContentType("application/json");
					resp.setHeader("Content-type", "application/json");
					resp.getWriter().write(serializer.exclude("*.class").serialize(output));
				}
			}
			else{
				/*
				Query query = persistenceManager.newQuery(
						"select from " + Score.class.getName()
						+ " order by score desc ");
				query.setRange(0, 5);
				
				collection = (Collection)query.execute();
		
				//Print out the results so long as there are some
				if(!collection.isEmpty()){
					//Create a new serializer
					JSONSerializer serializer = new JSONSerializer();
					
					//Set content type
					resp.setContentType("text/html");
					
					//Print the collection as JSON
					resp.getWriter().println(
							serializer.exclude("*.class"
											//	"key"
											//	"key.kind", 
											//	"key.name", 
											//	"key.namespace",
											//	"key.parent"
							).serialize(collection)
					);
				}
				else{
					resp.getWriter().println("{}");
				}
				*/
			}
							
			//close the persistence manager
			if(persistenceManager != null)
				 persistenceManager.close();
		}	
	}
	
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
				
		/*
		 * Parameters required:
		 * 	ingredientName - integer
		 * 	unitName - integer
		 * 	amount - string
		 */
		String requestURI = req.getRequestURI();
		String objectQuery = URLDecoder.decode(requestURI.substring(requestURI.lastIndexOf("/") + 1), "UTF-8");
		if(requestURI.indexOf("/rest") != -1){
			if(objectQuery.contentEquals("feedback")){
				String comment = req.getParameter("comment");
				String deviceID = req.getParameter("deviceID");
				
				Comment comment1 = new Comment();
				comment1.setComment(comment);
				comment1.setDevice(deviceID);

				//Get a reference to the persistence manager
				PersistenceManager persistenceManager = JDOUtil.persistenceManagerFactory.getPersistenceManager();
				persistenceManager.makePersistent(comment1);
				
				if(persistenceManager != null)
					 persistenceManager.close();				
			}
			else{
				String score = req.getParameter("score");
				String kernel = req.getParameter("kernel");
				String deviceID = req.getParameter("deviceID");
				String model = req.getParameter("model");
				String secret = req.getParameter("secretcode");
				String version = req.getParameter("version");
	
				String check = score + model + "Motzo hiyatzabo!!1";
				
				Float floatScore = Float.parseFloat(score);
				
				boolean success = false;
				try {
					MessageDigest md = MessageDigest.getInstance("MD5");
					md.update(check.getBytes());
					byte digest[] = md.digest();
					
					StringBuffer hexString = new StringBuffer();
					for(int i = 0; i < digest.length; i++){
						String hex = Integer.toHexString(0xFF & digest[i]);
						if(hex.length() == 1)
							hexString.append('0');
						hexString.append(hex);
					}
					
					if(hexString.toString().contentEquals(secret))
						success = true;
					
				} catch (NoSuchAlgorithmException e) {
					
					e.printStackTrace();
				}
				
				if(success){
					PersistenceManager persistenceManager = JDOUtil.persistenceManagerFactory.getPersistenceManager();
					
					
					
					//Create keys, see if they exist, create them if they don't
					
					//Kernel
					Key kernelKey = KeyFactory.createKey(Kernel.class.getSimpleName(), kernel);
					Query tempQuery = persistenceManager.newQuery("SELECT key from " + Kernel.class.getName() + " WHERE key == :p1");
					List<Key> tempKey = (List<Key>)tempQuery.execute(kernelKey);
					
					if(tempKey.isEmpty()){
						Kernel newKernel = new Kernel();
						newKernel.setKey(kernelKey);
						newKernel.setKernel(kernel);
						persistenceManager.makePersistent(newKernel);
					}
					
					//DeviceID
					Key deviceKey = KeyFactory.createKey(Device.class.getSimpleName(), deviceID);
					tempQuery = persistenceManager.newQuery("SELECT key from " + Device.class.getName() + " WHERE key == :p1");
					tempKey = (List<Key>)tempQuery.execute(deviceKey);
					
					if(tempKey.isEmpty()){
						Device newDevice = new Device();
						newDevice.setKey(deviceKey);
						newDevice.setDevice(deviceID);
						persistenceManager.makePersistent(newDevice);
					}
					
					//Model
					Key modelKey = KeyFactory.createKey(Model.class.getSimpleName(), model);
					tempQuery = persistenceManager.newQuery("SELECT key from " + Model.class.getName() + " WHERE key == :p1");
					tempKey = (List<Key>)tempQuery.execute(modelKey);
					
					if(tempKey.isEmpty()){
						Model newModel = new Model();
						newModel.setKey(modelKey);
						newModel.setModel(model);
						persistenceManager.makePersistent(newModel);
					}
					
					//Version
					Key versionKey = KeyFactory.createKey(Version.class.getSimpleName(), version);
					tempQuery = persistenceManager.newQuery("SELECT key from " + Version.class.getName() + " WHERE key == :p1");
					tempKey = (List<Key>)tempQuery.execute(versionKey);
					
					if(tempKey.isEmpty()){
						Version newVersion = new Version();
						newVersion.setKey(versionKey);
						newVersion.setVersion(version);
						persistenceManager.makePersistent(newVersion);
					}
									
					//Create new score
					Score newScore = new Score();
					newScore.setScore(floatScore);
					newScore.setKernel(kernelKey);
					newScore.setDeviceID(deviceKey);
					newScore.setModel(modelKey);
					newScore.setVersion(versionKey);
					
					persistenceManager.makePersistent(newScore);
					
					if(persistenceManager != null)
						 persistenceManager.close();
				}
			}
		}		
	}
}
