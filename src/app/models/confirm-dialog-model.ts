export interface ConfirmDialogModel {
    header?: string,
    question?: string,
    topIcon?: string,
    acceptIcon?: string | 'pi pi-check',
    rejectIcon?: string | 'pi pi-times',
    acceptLabel?: string,
    rejectLabel?: string,
}