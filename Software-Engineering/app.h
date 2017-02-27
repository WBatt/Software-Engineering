#ifndef APP_H
#define APP_H

#include "userinfo.h"
#include "mainwindow.h"
#include "api.h"
class App
{
public:
    //enum corresponding names to indices
    enum EPAGE
    {
        EP_REGISTER = 0,
        EP_LOGIN = 1,
        EP_HOME = 2,
        EP_FORGOTPASS = 3
    };
    //constructor
    App();

    //delete any copy functions or constructors
    App(App const&) = delete;
    void operator=(App const&) = delete;

    int Execute(int argc, char* argv[]);
    static App* getInstance();
    Api restAPI;
    UserInfo user;
    MainWindow* w;
private:
    static App* _instance;
};

#endif // APP_H
