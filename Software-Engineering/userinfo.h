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
    QString getFirstName();
    void setFirstName(QString newFirst);
    QString getLastName();
    void setLastName(QString newLast);
    QString getUsername();
    void setUsername(QString newUser);
    QString getPassword();
    void setPassword(QString newPass);
    QString getPassConfirm();
    void setPassConfirm(QString newPC);
    QString getEmail();
    void setEmail(QString newEmail);
    //NO SET TOKEN. only internal modification
    QString getToken();

private:
    QString firstName;
    QString lastName;
    QString email;
    QString username;
    QString password; //i know, we aren't keeping this.
    QString passConfirm;
    QString token;
    int allergens;
};
#endif // USERINFO_H
