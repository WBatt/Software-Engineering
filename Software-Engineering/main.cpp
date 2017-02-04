#include "mainwindow.h"
#include <QApplication>
#include <QSqlDatabase>

int main(int argc, char *argv[])
{
    QSqlDatabase db = QSqlDatabase::addDatabase("QMYSQL");
    db.setHostName("www.mikebobadilla.com");
    db.setDatabaseName("cs441");
    db.setUserName("cs441");
    db.setPassword("HwhW4QWYHjV7tTkX");
    bool ok = db.open();
    QApplication a(argc, argv);
    MainWindow w;
    w.show();

    return a.exec();
}
