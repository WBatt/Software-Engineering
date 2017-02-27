#include "registerbutton.h"
#include "app.h"
#include <QtDebug>
RegisterButton::RegisterButton(QWidget* parent) : CustomButton(parent)
{

}

void RegisterButton::ClickBehavior()
{
    //always emit signal to fetch text from the text fields
    //these text fields are connected by the GUI team
    emit requestText();

    if(App::getInstance()->user.checkPassConfirm())
    {
        //add user info to database
        if(App::getInstance()->user.registerUser())
        {
            //switch page to *dashboard* rerouting to home page
            App::getInstance()->w->changePage(App::EP_HOME);
        }

    }
    else
    {
        qDebug() << "Password mismatch" << endl;
        //display register error message

    }

}
