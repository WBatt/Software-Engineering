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
