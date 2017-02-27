#include "userinfo.h"
#include <QtDebug>
#include "app.h"
UserInfo::UserInfo()
{
    email = "jonnyeveryman@spammail.com";
    username = "Guest";
    password = "pass";
    passConfirm = "Pass";
    allergens = 0x3FF;

}

bool UserInfo::checkPassConfirm()
{
    return password.compare(passConfirm,Qt::CaseSensitive) == 0;
}

bool UserInfo::loginUser()
{
    //server api call authentication
    QJsonObject attempt = App::getInstance()->restAPI.login(username, password);
    qDebug() << attempt["success"];
    if(attempt["success"].toBool())
    {
        //save token
        token = attempt["token"].toString();
        //change the page to the dashboard, until then im rerouting home
        App::getInstance()->w.changePage(App::EP_HOME);
        return true;
    }
    //else failed so display error message
    App::getInstance()->w.loginShowError(attempt["message"].toString());
    return false;
}
bool UserInfo::registerUser()
{
    //server api call to add user to db
    QJsonObject response = App::getInstance()->restAPI.register_user(email, username, password);

    qDebug() << response["message"].toString() << endl;
    if(!response["success"].toBool())
    {
        App::getInstance()->w.registerShowError(response["message"].toString());
        return false;
    }

    //switch page to *dashboard* rerouting to home page
    App::getInstance()->w.changePage(App::EP_HOME);
    return true;
}

QString UserInfo::getFirstName()
{
    return firstName;
}
void UserInfo::setFirstName(QString newFirst)
{
    firstName = newFirst;
    qDebug() << "SET FIRST NAME TO " << firstName;
}
QString UserInfo::getLastName()
{
    return lastName;
}
void UserInfo::setLastName(QString newLast)
{
    lastName = newLast;
    qDebug() << "SET LAST NAME TO " << lastName;
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

QString UserInfo::getEmail()
{
    return email;
}
void UserInfo::setEmail(QString newEmail)
{
    email = newEmail;
    qDebug() << "SET EMAIL TO " << email;
}
QString UserInfo::getToken()
{
    return token;
}
