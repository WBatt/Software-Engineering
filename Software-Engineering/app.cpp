
#include "mainwindow.h"
#include <QApplication>
#include <QSqlDatabase>
#include <QSqlQuery>
#include <QDebug>
#include <database.h>
#include "app.h"
#include <QtCore/QCoreApplication>
using namespace std;


App::App()
{
    if (_instance == NULL)
    {
        _instance = this;
    }
    else if (_instance != this)
    {
        delete this;
    }
}
App* App::getInstance(){return _instance;}

int App::Execute(int argc, char* argv[])
{

    QApplication a(argc, argv);
    QSqlDatabase db = QSqlDatabase::addDatabase("QMYSQL");
    db.setHostName(hostname);
    db.setDatabaseName(name);
    db.setUserName(username);
    db.setPassword(password);
   if (!db.open())
   {
      printf("didnt work");
   }

   QSqlQuery query;
   query.exec("select * from users");

   while(query.next()){

       QString name = query.value(1).toString();
       qDebug() << name;
   }
   MainWindow w;
   w.show();

   return a.exec();
   return 0;
}
