#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include "createaccount.h"

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private slots:
    void on_pushButton_clicked();

<<<<<<< HEAD
    void on_pushButton_Login_clicked();

    void on_pushButton_3_clicked();

    void on_pushButton_2_clicked();

    void on_pushButton_CreateAccount_clicked();

    void on_pushButton_GOTO_Login_clicked();

    void on_pushButton_GOTO_CreateAccount_clicked();

    void on_pushButton_ForgotPass_clicked();

    void on_pushButton_register_clicked();

    void on_pushButton_CancelCreateAccount_clicked();

=======
>>>>>>> f39330dc4d818435996488afe0a5fd7087f964e5
private:
    Ui::MainWindow *ui;
    CreateAccount *acct_page;
};

#endif // MAINWINDOW_H
