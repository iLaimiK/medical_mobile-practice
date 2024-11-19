// 文件api类型
type FileInfo = {
    id: string;
    url: string;
};

// 定义QQ登录api类型
type QCType = {
  Login: {
    check(): boolean;
    getMe(fn: (openId: string) => void): void;
    showPopup(obj: object): void;
    signOut(): void;
  };
};

declare const QC: QCType;
