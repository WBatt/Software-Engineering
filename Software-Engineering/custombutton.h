#ifndef CUSTOMBUTTON_H
#define CUSTOMBUTTON_H
//#include <QtUiTools/QtUiTools>
#include <QPushButton>
class CustomButton : public QPushButton
{
    Q_OBJECT
public:
    CustomButton(QWidget *parent = 0);
public slots:
    virtual void ClickBehavior() = 0;

private:

};

#endif // CUSTOMBUTTON_H
