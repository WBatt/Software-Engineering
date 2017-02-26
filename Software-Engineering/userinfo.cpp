#include "userinfo.h"
#include <QtDebug>
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

QString UserInfo::getUsername()
{
    return username;
}

void UserInfo::setUsername(QString newUser)
{
    username = newUser;
    qDebug() << "SET USERNAME TO " << username << endl;
}

QString UserInfo::getPassword()
{
    return password;
}

void UserInfo::setPassword(QString newPass)
{
    password = newPass;
}
