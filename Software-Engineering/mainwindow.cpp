#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :  QMainWindow(parent), ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}

void MainWindow::changePage(int index)
{
    ui->stackedWidget->setCurrentIndex(index);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::on_pushButton_clicked()
{
    ui->stackedWidget->setCurrentIndex(1);
}




void MainWindow::on_pushButton_Login_clicked()
{
    ui->stackedWidget->setCurrentIndex(1);
}

void MainWindow::on_pushButton_CreateAccount_clicked()
{
    ui->stackedWidget->setCurrentIndex(2);
}

void MainWindow::on_pushButton_GOTO_Login_clicked()
{
    ui->stackedWidget->setCurrentIndex(0);
}

void MainWindow::on_pushButton_GOTO_CreateAccount_clicked()
{
    ui->stackedWidget->setCurrentIndex(2);
}

void MainWindow::on_pushButton_ForgotPass_clicked()
{
    ui->stackedWidget->setCurrentIndex(3);
}

void MainWindow::on_pushButton_register_clicked()
{
    ui->stackedWidget->setCurrentIndex(1);
}

void MainWindow::on_pushButton_CancelCreateAccount_clicked()
{
    ui->stackedWidget->setCurrentIndex(0);
}
/*
 * if a valid user name or password
 * is accepted -> update page to inform user
 * transaction was successful
 * if false then inform user
 */
void MainWindow::on_PushPass_clicked()
{/*
    //need to validate if true password or not
    bool confirmation = true;
    if(confirmation ){
        ui->user_inform_status->setText("An email has been sent to the provided email. Email should arrive within 15 mins");
        ui->PushPass->setVisible(false);
        ui->user_email_field->setVisible(false);
        ui->cancel_forget->setText("back");
    }

*/
}

void MainWindow::on_cancel_forget_clicked()
{

    if(!ui->PushPass->isVisible())
    {
        ui->user_inform_status->setText("Please enter username or email");
        ui->PushPass->setVisible(true);
        ui->user_email_field->setVisible(true);
        ui->cancel_forget->setText("cancel");
        ui->stackedWidget->setCurrentIndex(1);
    }
    else
    {
        ui->stackedWidget->setCurrentIndex(1);
    }
}
void MainWindow::on_pushButton_3_clicked()
{

}
