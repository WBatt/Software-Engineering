#ifndef APP_H
#define APP_H

#include "userinfo.h"
#include "mainwindow.h"

class App
{
public:
    enum EPAGE
    {
        EP_REGISTER = 0,
        EP_LOGIN = 1,
        EP_HOME = 2,
        EP_FORGOTPASS = 3
    };
    App();
    int Execute(int argc, char* argv[]);
    static App* getInstance();
    UserInfo user;
    MainWindow* w;
private:
    static App* _instance;
};

#endif // APP_H
