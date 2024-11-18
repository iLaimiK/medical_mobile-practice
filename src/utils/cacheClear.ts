// 保留登录信息
const LOGIN_KEYS = ["cp-user"];
// 清除 localStorage 和 sessionStorage
const clearCache = (): void => {
    Object.keys(localStorage).forEach((key) => {
        if (!LOGIN_KEYS.includes(key)) {
            localStorage.removeItem(key);
        }
    });
    sessionStorage.clear();
}

// 清除 IndexedDB
const clearIndexedDB = async (): Promise<void> => {
    if (!("indexedDB" in window)) {
        console.warn("当前浏览器不支持 indexedDB");
        return;
    }

    const db = await (indexedDB.databases ? indexedDB.databases() : Promise.resolve([]));
    db.forEach((db) => {
        if (db.name) {
            indexedDB.deleteDatabase(db.name);
        }
    });
}

// 清除Cookie
const clearCookie = (): void => {
    document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substring(0, eqPos).trim() : c.trim();
        if (!LOGIN_KEYS.includes(name)) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }
    })
}

// 清除网络请求缓存(Service Worker 和 Caches)
const clearNetworkCache = async (): Promise<void> => {
    if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
            await registration.unregister();
        }
    }

    if ("caches" in window) {
        const cacheNames = await caches.keys();
        for (const cacheName of cacheNames) {
            await caches.delete(cacheName);
        }
    }
}

// 清除所有缓存
export const clearAllCache = async (): Promise<void> => {
    clearCache();
    await clearIndexedDB();
    clearCookie();
    await clearNetworkCache();
}