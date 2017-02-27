#include "submitbutton.h"
#include "app.h"
#include <QtDebug>
SubmitButton::SubmitButton(QWidget *parent): CustomButton(parent)
{
   // setText(_instance->user.getUsername());

}
void SubmitButton::ClickBehavior()
{
    //fill user info with username and password
    emit requestText();

    //authenticate user info with that on the db
    //TODO - communicate with server, use result to determine path in condition
    App::getInstance()->user.loginUser();

    qDebug() << "DONE EMITTING" << endl;
}


