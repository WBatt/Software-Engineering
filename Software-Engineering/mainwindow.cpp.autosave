#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :  QMainWindow(parent), ui(new Ui::MainWindow)
{
    ui->setupUi(this);
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
{
    bool confirmation = true;

    if(confirmation)
    {
        ui->PushPass->setVisible(false);
        ui->user_id->setVisible(false);
        ui->forget_prompt->setText("An Email has been sent to the one you provided. \n "
                                   "Email should arrive with 15 minutes.");


    }

}

void MainWindow::on_cancel_forget_clicked()
{
    ui->stackedWidget->setCurrentIndex(0);
}
