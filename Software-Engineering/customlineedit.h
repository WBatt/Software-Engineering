#ifndef CUSTOMLINEEDIT_H
#define CUSTOMLINEEDIT_H
#include <QLineEdit>

class CustomLineEdit : public QLineEdit
{
    Q_OBJECT
public:
    CustomLineEdit(QWidget *parent = 0);
public slots:
    void handleRequest();
signals:
    void sendText(QString field);

};
#endif // CUSTOMTEXTEDIT_H
