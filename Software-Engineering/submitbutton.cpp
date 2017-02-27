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
    switch(App::getInstance()->user.loginUser())
    {
    case 0://success
        //change the page to the dashboard, until then im rerouting home
        App::getInstance()->w->changePage(App::EP_HOME);
        break;
    case 1: //invalid user info
        App::getInstance()->w->loginShowError("invalid user information");
        break;
    case 2: //no connection
        App::getInstance()->w->loginShowError("no connection to the internet");
    }
    qDebug() << "DONE EMITTING" << endl;
}


