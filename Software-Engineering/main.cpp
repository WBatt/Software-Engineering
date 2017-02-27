
#include "mainwindow.h"
#include "app.h"
#include <QApplication>
using namespace std;

int main(int argc, char *argv[])
{
    //DO NOT MODIFY THIS FUNCTION ANYMORE!
    //use app's execute function instead

    //initialize the application window
    QApplication a(argc, argv);
    return App::getInstance()->Execute(a);
}
