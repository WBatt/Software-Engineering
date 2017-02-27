#include "api.h"
#include "database.h"
#include <QNetworkRequest>
#include <QNetworkReply>
#include <QUrl>
#include <QUrlQuery>
#include <QJsonDocument>
#include <QJsonObject>
#include <QtNetwork>


Api::Api()
{
    webserver = "http://";
    webserver.append(server_address);
    webserver.append("/api/");
}

QJsonObject Api::register_user(QString name, QString username, QString password)
{
    QEventLoop eventLoop;

    QNetworkAccessManager manager;
    QObject::connect(&manager, SIGNAL(finished(QNetworkReply*)), &eventLoop, SLOT(quit()));
    QString request_string =  QString(this->webserver);
    request_string.append("users/");
    QNetworkRequest req(request_string);

    req.setHeader(QNetworkRequest::ContentTypeHeader, "application/x-www-form-urlencoded");

    QUrlQuery params;
    params.addQueryItem("name", name);
    params.addQueryItem("username", username);
    params.addQueryItem("password", password);

    QNetworkReply *reply = manager.post(req, params.toString(QUrl::FullyEncoded).toUtf8());
    eventLoop.exec();

    if (reply->error() == QNetworkReply::NoError){
        QJsonObject json_obj = QJsonDocument::fromJson(reply->readAll()).object();
        delete reply;
        return json_obj;
    } else {
        qDebug() << "Error ";
        qDebug() << "Error " << reply->errorString();
        QJsonDocument response(
        {

            "success", false,
            "message", reply->errorString()

        });
        delete reply;
        return QJsonObject(response.object());
    }
}

QJsonObject Api::login(QString username, QString password)
{
    QEventLoop eventLoop;

    QNetworkAccessManager manager;
    QObject::connect(&manager, SIGNAL(finished(QNetworkReply*)), &eventLoop, SLOT(quit()));
    QString request_string =  QString(this->webserver);
    request_string.append("login/");
    QNetworkRequest req(request_string);

    req.setHeader(QNetworkRequest::ContentTypeHeader, "application/x-www-form-urlencoded");

    QUrlQuery params;
    params.addQueryItem("username", username);
    params.addQueryItem("password", password);

    QNetworkReply *reply = manager.post(req, params.toString(QUrl::FullyEncoded).toUtf8());
    eventLoop.exec();

    if (reply->error() == QNetworkReply::NoError){
        QJsonObject json_obj = QJsonDocument::fromJson(reply->readAll()).object();
        delete reply;
        return json_obj;
    } else {
        qDebug() << "Error ";
        qDebug() << "Error " << reply->errorString();
        QJsonDocument response(
        {

            "success", false,
            "message", reply->errorString()

        });
        delete reply;
        return QJsonObject(response.object());
    }
}
