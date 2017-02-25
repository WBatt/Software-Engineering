#include "submitbutton.h"
#include "app.h"
#include <QtDebug>
SubmitButton::SubmitButton(QWidget *parent): CustomButton(parent)
{
   // setText(_instance->user.getUsername());

}
void SubmitButton::ClickBehavior()
{
    emit requestText();
    qDebug() << "DONE EMITTING" << endl;
}

void SubmitButton::getUserText(QString userText)
{
    App::getInstance()->user.setUsername(userText);
}
void SubmitButton::getPassText(QString newPass)
{
    App::getInstance()->user.setPassword(newPass);

}
