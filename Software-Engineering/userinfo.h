#ifndef USERINFO_H
#define USERINFO_H

#include <QString>
class UserInfo
{
public:
    UserInfo();

    bool checkPassConfirm();
    //get/set
    QString getUsername();
    void setUsername(QString newUser);
    QString getPassword();
    void setPassword(QString newPass);
private:
    QString username;
    QString password; //i know, we aren't keeping this.
    QString passConfirm;
    int allergens;
};
#endif // USERINFO_H
