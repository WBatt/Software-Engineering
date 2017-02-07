#include "custombutton.h"

CustomButton::CustomButton(QWidget *parent) : QPushButton(parent)
{

    QObject::connect(this, SIGNAL(clicked()),this, SLOT(doSometihngelse()));


}

void CustomButton::changeName()
{
    this->setText("PRESSED");
}

void CustomButton::doSometihngelse()
{
    this->setText("Whoo");
}
