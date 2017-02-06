#include "custombutton.h"

CustomButton::CustomButton(QWidget *parent) : QPushButton(parent)
{

    QObject::connect(this, SIGNAL(clicked()),this, SLOT(changeName()));

}

void CustomButton::changeName()
{
    this->setText("PRESSED");
}
