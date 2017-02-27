#include <QApplication>
#include <QDebug>
#include "app.h"
#include <QtCore/QCoreApplication>

using namespace std;

//declaration of static variables
App* App::_instance = NULL;

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
App* App::getInstance()
{
    if(_instance == NULL) _instance = new App();
    return _instance;
}


/*main entry point for application
GUI team tweak stuff here versus throwing it into the main.cpp*/
int App::Execute(QApplication& qapp)
{
    //some obligatory unused call for qapp to get rid of unreferenced warning
    //since we arent calling "qapp = ..." or "... = qapp"
    Q_UNUSED(qapp);
    //initialize the webserver address
    restAPI.init();
    //show main window in the main view
    w.show();

    return qapp.exec();
}
