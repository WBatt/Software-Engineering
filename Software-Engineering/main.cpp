#include "mainwindow.h"
#include <QApplication>
#include <QDebug>
#include <QtNetwork>
#include <QNetworkRequest>
#include <QNetworkReply>
#include <QUrl>
#include <QUrlQuery>

#include <QtCore/QCoreApplication>

void sendRequest();

using namespace std;


int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    sendRequest();
   //MainWindow w;
   //w.show();

   //return a.exec();
   return 0;
}

void sendRequest()
{
    QEventLoop eventLoop;

    QNetworkAccessManager manager;
    QObject::connect(&manager, SIGNAL(finished(QNetworkReply*)), &eventLoop, SLOT(quit()));

    QNetworkRequest req(QUrl(QString("https://jsonplaceholder.typicode.com/posts")));
    QNetworkReply *reply = manager.get(req);
    eventLoop.exec();

    if (reply->error() == QNetworkReply::NoError){
        qDebug() << "Success";
        //qDebug() << "Success " reply->readAll();
        delete reply;
    } else {
        qDebug() << "Error ";
        //qDebug() << "Error " << reply->errorString();
        delete reply;
    }
}
