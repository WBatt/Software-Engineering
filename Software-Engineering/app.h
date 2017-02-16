#ifndef APP_H
#define APP_H

class App
{
public:
    App();
    int Execute(int argc, char* argv[]);
    App* getInstance();

};

static App* _instance;
#endif // APP_H
