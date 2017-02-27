#include "custombutton.h"
#include "app.h"
CustomButton::CustomButton(QWidget *parent) : QPushButton(parent)
{
    QObject::connect(this, SIGNAL(clicked()),this, SLOT(ClickBehavior()));

}

void CustomButton::ClickBehavior()
{
    this->setText("ABSTRACT");

}
void CustomButton::getUserText(QString userText)
{
    App::getInstance()->user.setUsername(userText);
}
void CustomButton::getPassText(QString newPass)
{
    App::getInstance()->user.setPassword(newPass);
}
void CustomButton::getPassConfirmText(QString passConfirmText)
{
    App::getInstance()->user.setPassConfirm(passConfirmText);
}
void CustomButton::getEmailText(QString emailText)
{
    App::getInstance()->user.setEmail(emailText);
}
void CustomButton::getFirstText(QString firstText)
{
    App::getInstance()->user.setFirstName(firstText);
}
void CustomButton::getLastText(QString lastText)
{
    App::getInstance()->user.setLastName(lastText);
}
