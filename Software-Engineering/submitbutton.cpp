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
    if(App::getInstance()->user.loginUser())
    {
        //change the page to the dashboard, until then im rerouting home
        App::getInstance()->w->changePage(App::EP_HOME);
    }
    qDebug() << "DONE EMITTING" << endl;
}


