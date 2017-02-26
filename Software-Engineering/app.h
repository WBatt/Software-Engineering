#ifndef APP_H
#define APP_H

#include "userinfo.h"
class App
{
public:
    App();
    int Execute(int argc, char* argv[]);
    static App* getInstance();
    UserInfo user;
private:
    static App* _instance;
};

#endif // APP_H
