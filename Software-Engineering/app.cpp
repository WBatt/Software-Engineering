
#include "mainwindow.h"
#include <QApplication>
#include <QtNetwork>
#include <QNetworkRequest>
#include <QNetworkReply>
#include <QUrl>
#include <QUrlQuery>
#include <QJsonDocument>
#include <QDebug>
#include "app.h"
#include <QtCore/QCoreApplication>

void sendRequest();

using namespace std;

//declaration of static variables
App* App::_instance = new App();

//once constructed, any other app initializations will just be deleted
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

/*returns the singleton instance of the entire application.
use this to reference anything like user data or product data
made _instance private so there wouldn't be a chance it could be accidentally deleted/overwritten
*/
App* App::getInstance(){return _instance;}


/*main entry point for application
GUI team tweak stuff here versus throwing it into the main.cpp*/
int App::Execute(int argc, char* argv[])
{

    QApplication a(argc, argv);
    sendRequest();
    MainWindow w;
    w.show();

    return a.exec();

}

void sendRequest()
{
    QEventLoop eventLoop;

    QNetworkAccessManager manager;
    QObject::connect(&manager, SIGNAL(finished(QNetworkReply*)), &eventLoop, SLOT(quit()));

    QNetworkRequest req(QUrl(QString("http://198.199.103.52/api/users/")));

    req.setHeader(QNetworkRequest::ContentTypeHeader, "application/x-www-form-urlencoded");

    QUrlQuery params;
    params.addQueryItem("username", "testing");
    params.addQueryItem("password", "Testing");

    QNetworkReply *reply = manager.post(req, params.toString(QUrl::FullyEncoded).toUtf8());
    eventLoop.exec();

    if (reply->error() == QNetworkReply::NoError){
        //qDebug() << "Success";
        QJsonObject json_obj = QJsonDocument::fromJson(reply->readAll()).object();
        qDebug() << "Success " << json_obj["message"].toString();
        delete reply;
    } else {
        qDebug() << "Error ";
        qDebug() << "Error " << reply->errorString();
        delete reply;
    }
}
