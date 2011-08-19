package com.wordpress.mobilecoder.webosmark.stats;

import javax.jdo.JDOHelper;
import javax.jdo.PersistenceManagerFactory;

public class JDOUtil {

  public static final PersistenceManagerFactory persistenceManagerFactory =
    JDOHelper.getPersistenceManagerFactory("transactions-optional");

} 
