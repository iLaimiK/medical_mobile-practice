type QCType = {
  Login: {
    check(): boolean;
    getMe(fn: (openId: string) => void): void;
    showPopup(obj: object): void;
    signOut(): void;
  };
};

declare const QC: QCType;
