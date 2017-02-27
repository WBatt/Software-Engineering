#ifndef API_H
#define API_H

#include <qjsonobject.h>

class Api
{
    public:
        Api();
        QJsonObject register_user(QString name, QString username, QString password);
        QJsonObject login(QString username, QString password);
        QJsonArray getItem(QString keyword);

    private:
        QString webserver;
};

#endif // API_H
