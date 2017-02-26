#include "mainwindow.h"
#include "app.h"
#include <QtCore/QCoreApplication>

using namespace std;

int main(int argc, char *argv[])
{
    return App::getInstance()->Execute(argc, argv);
}
