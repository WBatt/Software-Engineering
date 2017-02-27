#include <QApplication>
#include <QDebug>
#include "app.h"
#include <QtCore/QCoreApplication>

using namespace std;

//declaration of static variables
App* App::_instance = new App();

//once constructed, any other app initializations will just be deleted
App::App()
{
    if (_instance == NULL)
    {
        _instance = this;
    }
    else if (_instance != this)
    {
        delete this;
    }
}


/*returns the singleton instance of the entire application.
use this to reference anything like user data or product data
made _instance private so there wouldn't be a chance it could be accidentally deleted/overwritten
*/
App* App::getInstance(){return _instance;}


/*main entry point for application
GUI team tweak stuff here versus throwing it into the main.cpp*/
int App::Execute(int argc, char* argv[])
{
    //initialize the webserver address
    restAPI.init();
    //initialize the application window
    QApplication a(argc, argv);
    //initialize window contents
    w = new MainWindow();
    //show main window in the main view
    w->show();

    return a.exec();
}
