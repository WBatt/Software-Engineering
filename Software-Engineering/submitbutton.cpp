#include "submitbutton.h"
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


