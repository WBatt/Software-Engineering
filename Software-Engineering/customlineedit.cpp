#include "customlineedit.h"

CustomLineEdit::CustomLineEdit(QWidget *parent): QLineEdit(parent)
{}

void CustomLineEdit::handleRequest()
{
    emit sendText(this->text());
}
