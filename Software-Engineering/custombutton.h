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
    void changeName();

private:

};

#endif // CUSTOMBUTTON_H
