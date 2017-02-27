#ifndef USERINFO_H
#define USERINFO_H

#include <QString>
class UserInfo
{
public:
    UserInfo();

    bool checkPassConfirm();
    bool loginUser();
    bool registerUser();
    //get/set
    QString getUsername();
    void setUsername(QString newUser);
    QString getPassword();
    void setPassword(QString newPass);
    QString getPassConfirm();
    void setPassConfirm(QString newPC);
private:
    QString username;
    QString password; //i know, we aren't keeping this.
    QString passConfirm;
    QString token;
    int allergens;
};
#endif // USERINFO_H
