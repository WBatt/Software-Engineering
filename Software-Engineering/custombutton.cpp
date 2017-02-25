#include "custombutton.h"

CustomButton::CustomButton(QWidget *parent) : QPushButton(parent)
{
    QObject::connect(this, SIGNAL(clicked()),this, SLOT(ClickBehavior()));

}

void CustomButton::ClickBehavior()
{
    this->setText("ABSTRACT");

}
