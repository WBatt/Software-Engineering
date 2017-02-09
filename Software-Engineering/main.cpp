#include "mainwindow.h"
#include <QApplication>
#include <QSqlDatabase>
#include <QSqlQuery>
#include <QDebug>
#include <database.h>

#include <QtCore/QCoreApplication>

using namespace std;


int main(int argc, char *argv[])
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
   //QApplication a(argc, argv);
   //MainWindow w;
   //w.show();

   //return a.exec();
   return 0;
}
