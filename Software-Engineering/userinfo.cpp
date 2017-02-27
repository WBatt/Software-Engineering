#include "userinfo.h"
#include <QtDebug>
#include "app.h"
UserInfo::UserInfo()
{
    username = "Guest";
    password = "pass";
    passConfirm = "Pass";
    allergens = 0x3FF;

}

bool UserInfo::checkPassConfirm()
{
    return password.compare(passConfirm,Qt::CaseSensitive) == 0;
}

int UserInfo::loginUser()
{
    int result = 0;
    //server api call authentication


    return result;
}
int UserInfo::registerUser()
{
    int result = 0;
    //server api call to add user to db
    QJsonObject response = App::getInstance()->restAPI->register_user(username, username, password);

    qDebug() << response["message"].toString() << endl;
    if(!response["success"].toBool())
    {
        App::getInstance()->w->registerShowError(response["message"].toString());
        result = -1;
    }
    return result;
}
QString UserInfo::getUsername()
{
    return username;
}

void UserInfo::setUsername(QString newUser)
{
    username = newUser;
    qDebug() << "SET USERNAME TO " << username;
}

QString UserInfo::getPassword()
{
    return password;
}

void UserInfo::setPassword(QString newPass)
{
    password = newPass;
    qDebug() << "SET PASSWORD TO " << password;
}

QString UserInfo::getPassConfirm()
{
    return passConfirm;
}
void UserInfo::setPassConfirm(QString newPC)
{
    passConfirm = newPC;
    qDebug() << "SET PASSWORD CONFIRM TO " << passConfirm;
}
