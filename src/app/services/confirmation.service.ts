import { Injectable } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(
    private _fuseConfirmationService: FuseConfirmationService,
    private _translocoService: TranslocoService
  ) { }

  getError(message?, data?) {
    const activeLang = this._translocoService.getActiveLang();

    switch (message) {
      case 'Action not found':
        this.showErrorActionNotFound(activeLang);
        break;
      case 'Action not registered':
        this.showErrorActionNotRegistered(activeLang);
        break;
      case 'Incomplete parameters':
        this.showErrorIncompleteParameter(activeLang);
        break;
      case 'Your company account has not been activated':
        this.showErrorInactiveCompany(activeLang);
        break;
      case 'Your company account has been blocked':
        this.showErrorBannedCompany(activeLang);
        break;
      case 'Exceed image size':
        this.showErrorExceedSize(activeLang, data)
        break;
      case 'No updated data':
        this.showErrorNoUpdatedData(activeLang);
        break;
      case 'Wrong parameter':
        this.showErrorWrongParameter(activeLang, data);
        break;
      case 'Wrong password':
        this.showErrorWrongPassword(activeLang);
        break;
      case 'Email have been registered':
        this.showErrorHaveBeenUsed(activeLang, 'company-email');
        break;
      case 'Email not registered':
        this.showErrorNotFound(activeLang, 'company-email');
        break;
      case 'Position code have been used':
        this.showErrorHaveBeenUsed(activeLang, 'position-code');
        break;
      case 'Position name have been used':
        this.showErrorHaveBeenUsed(activeLang, 'position-name');
        break;
      case 'Department code have been used':
        this.showErrorHaveBeenUsed(activeLang, 'department-code');
        break;
      case 'Department name have been used':
        this.showErrorHaveBeenUsed(activeLang, 'department-name');
        break;
      case 'Approval name already exist':
        this.showErrorHaveBeenUsed(activeLang, 'name');
        break;
      case 'Work day name have been used':
        this.showErrorHaveBeenUsed(activeLang, 'name');
        break;
      case 'Leave name have been used':
        this.showErrorHaveBeenUsed(activeLang, 'name');
        break;
      case 'Reimbursement category name have been used':
        this.showErrorHaveBeenUsed(activeLang, 'name');
        break;
      case 'Some duplicate data found':
        this.showErrorDuplicateDataFound(activeLang, data);
        break;
      case 'Some data already exist':
        this.showErrorDataExist(activeLang, data);
        break;
      case 'Date holiday have been exist':
        this.showErrorExist(activeLang, 'date');
        break;
      case 'Leave period already exist':
        this.showErrorExist(activeLang, 'leave-period');
        break;
      case 'Must excel file':
        this.showErrorMustExcelFile(activeLang);
        break;
      case 'Company not found':
        this.showErrorCompanyNotFound(activeLang);
        break;
      case 'Data not found':
        this.showErrorDataNotFound(activeLang);
        break;
      case 'Data have been used':
        this.showErrorDataHaveBeenUsed(activeLang);
        break;
      case 'Used leave greater than total leave':
        this.showErrorGreaterThan('leave-used', 'leave-total', activeLang);
        break;
      case 'On progress leave exist':
        // this.showErrorDuplicateDataFound(activeLang, data);
        break;
      default:
        this.showErrorUnknown(activeLang);
    }
  }

  showError(title, message) {
    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorUnknown(language) {
    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = 'Sebuah kesalahan terjadi. Silakan coba lagi nanti.';
    } else {
      title = 'Error';
      message = 'An error occured. Please try again later.';
    }
    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorConnection(language) {
    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Koneksi Gagal';
      message = 'Silakan cek koneksi internet Anda.';
    } else {
      title = 'Failed Connection';
      message = 'Please check your internet connection.';
    }
    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorActionNotFound(language) {
    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = 'Ooopss... Ada error pada sistem. Kami akan berusaha memperbaikinya segera. (error: action not found)';
    } else {
      title = 'Error';
      message = 'Ooopss... There is an error in our system. We will try to fix it soon. (error: action not found)';
    }
    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorActionNotRegistered(language) {
    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = 'Ooopss... Ada error pada sistem. Kami akan berusaha memperbaikinya segera. (error: action not registered)';
    } else {
      title = 'Error';
      message = 'Ooopss... There is an error in our system. We will try to fix it soon. (error: action not registered)';
    }
    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorExceedSize(language, data) {

    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = 'Maksimal ukuran file ' + data.max_size;
    } else {
      title = 'Error';
      message = 'Max file size ' + data.max_size;
    }

    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorIncompleteParameter(language) {
    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = 'Ooopss... Ada error pada sistem. Kami akan berusaha memperbaikinya segera. (error: incomplete parameter)';
    } else {
      title = 'Error';
      message = 'Ooopss... There is an error in our system. We will try to fix it soon. (error: incomplete parameter)';
    }
    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorInactiveCompany(language) {
    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = 'Akun perusahaan Anda belum diaktifkan. Harap verifikasi email perusahaan Anda untuk mengaktifkan akun perusahaan Anda.';
    } else {
      title = 'Error';
      message = 'Your company account has not been activated. Please verify your company email to activate your company account.';
    }
    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorBannedCompany(language) {
    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = 'Akun perusahaan Anda telah diblokir. Harap menghubungi Call Center untuk informasi lebih lanjut dengan menyebutkan email perusahaan Anda.';
    } else {
      title = 'Error';
      message = 'Your company account has been blocked. Please contact the Call Center for more information by specifying your company email.';
    }
    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorWrongParameter(language, param) {
    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = 'Ooopss... Ada error pada sistem. Kami akan berusaha memperbaikinya segera. (error: wrong parameter ' + param + ')';
    } else {
      title = 'Error';
      message = 'Ooopss... There is an error in our system. We will try to fix it soon. (error: wrong parameter ' + param + ')';
    }
    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorNoUpdatedData(language) {
    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = 'Tidak data yang berubah';
    } else {
      title = 'Error';
      message = 'No updated data';
    }
    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorHaveBeenUsed(language, alias) {
    const translatedName: string = this._translocoService.translate(alias);

    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = translatedName.toUpperCase() + ' sudah digunakan';
    } else {
      title = 'Error';
      message = translatedName.toUpperCase() + ' have been used';
    }
    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorExist(language, alias) {
    const translatedName: string = this._translocoService.translate(alias);

    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = translatedName.toUpperCase() + ' sudah ada';
    } else {
      title = 'Error';
      message = translatedName.toUpperCase() + ' alread exist';
    }
    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorDuplicateDataFound(language, data) {
    const email: string = this._translocoService.translate('personal-email');
    const idEmployee: string = this._translocoService.translate('id-employee');
    const phoneNo: string = this._translocoService.translate('phone-no');
    const workEmail: string = this._translocoService.translate('work-email');

    let title = '';
    let message = '';

    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = 'Beberapa data duplikat ditemukan: <br><br>';
    } else {
      title = 'Error';
      message = 'Some duplicate data found: <br><br>';
    }

    if (data.duplicate.email !== null) {
      message = message + '- ' + email + ' = ' + data.duplicate.email.join(', ') + '<br>';
    }

    if (data.duplicate.id_employee !== null) {
      message = message + '- ' + idEmployee + ' = ' + data.duplicate.id_employee.join(', ') + '<br>';
    }

    if (data.duplicate.phone_no !== null) {
      message = message + '- ' + phoneNo + ' = ' + data.duplicate.phone_no.join(', ') + '<br>';
    }

    if (data.duplicate.work_email! += null) {
      message = message + '- ' + workEmail + ' = ' + data.duplicate.work_email.join(', ') + '<br>'
    }

    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorDataExist(language, data) {
    const idEmployee: string = this._translocoService.translate('id-employee');
    const phoneNo: string = this._translocoService.translate('phone-no');
    const workEmail: string = this._translocoService.translate('work-email');

    let title = '';
    let message = '';

    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = 'Beberapa data sudah ada: <br><br>';
    } else {
      title = 'Error';
      message = 'Some data already exist: <br><br>';
    }

    if (data.exist.id_employee !== null) {
      message = message + '- ' + idEmployee + ' = ' + data.exist.id_employee.join(', ') + '<br>';
    }

    if (data.exist.phone_no !== null) {
      message = message + '- ' + phoneNo + ' = ' + data.exist.phone_no.join(', ') + '<br>';
    }

    if (data.exist.work_email! !== null) {
      message = message + '- ' + workEmail + ' = ' + data.exist.work_email.join(', ') + '<br>';
    }

    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorNotFound(language, alias) {
    const translatedName: string = this._translocoService.translate(alias);

    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = translatedName.toUpperCase() + ' tidak ditemukan';
    } else {
      title = 'Error';
      message = translatedName.toUpperCase() + ' not found';
    }

    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorWrongPassword(language) {
    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = 'Kata sandi salah';
    } else {
      title = 'Error';
      message = 'Wrong password';
    }

    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorMustExcelFile(language) {
    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = 'Harus berupa file excel berekstensi .xls atau .xlsx';
    } else {
      title = 'Error';
      message = 'Must excel file with extension .xls or .xlsx';
    }

    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorCompanyNotFound(language) {
    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = 'Data perusahaan tidak ditemukan!';
    } else {
      title = 'Error';
      message = 'Company data not found!';
    }

    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorDataNotFound(language) {
    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = 'Tidak ada data yang ditemukan';
    } else {
      title = 'Error';
      message = 'No data found';
    }

    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorDataHaveBeenUsed(language) {
    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = 'Maaf, data tidak bisa dihapus. Silakan non-aktifkan data jika diperlukan.';
    } else {
      title = 'Error';
      message = 'Sorry, data can not be deleted. Please inactive data if needed.';
    }

    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",

        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showErrorGreaterThan(firstParam, secondParam, language) {
    let title = '';
    let message = '';

    const firstParamName: string = this._translocoService.translate(firstParam);
    const secondParamName: string = this._translocoService.translate(secondParam);

    if (language === 'id') {
      title = 'Terjadi Kesalahan';
      message = firstParamName.toUpperCase() + ' lebih besar dari ' + secondParamName.toUpperCase();
    } else {
      title = 'Error';
      message = firstParamName.toUpperCase() + ' greater than ' + secondParamName.toUpperCase();
    }

    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "warn",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "warn",

        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }

  showInfoDataHaveBeenSavedSuccessfully(language) {
    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Berhasil';
      message = 'Data berhasil disimpan';
    } else {
      title = 'Success';
      message = 'Data have been save successfully';
    }

    this.showInfo(title, message);
  }

  showInfoUnderDevelopment(language) {
    let title = '';
    let message = '';
    if (language === 'id') {
      title = 'Sedang dikembangkan';
      message = 'Mohon maaf, fitur sedang dalam pengembangan';
    } else {
      title = 'Under development';
      message = 'Sorry, this feature under development';
    }

    this.showInfo(title, message);
  }

  showInfoPopup(name) {
    const message = this._translocoService.translate(name);
    const language = this._translocoService.getActiveLang();

    let title = '';
    if (language === 'id') {
      title = 'Informasi';
    } else {
      title = 'Information';
    }

    this.showInfo(title, message);
  }

  showInfo(title, message) {
    const dialogRef = this._fuseConfirmationService.open({
      title: title,
      message: message,
      icon: {
        show: true,
        name: "heroicons_outline:information-circle",
        color: "primary",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "primary",
        },
        cancel: {
          show: false,
        },
      },
      dismissible: true,
    });
  }
}
