import { ref, watch } from "vue";

const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

export type ThemeMode = "light" | "dark" | "auto";

const setDarkMode = (darkMode: boolean) => {
    if (darkMode) {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }
};

const darkModeChangeEvent = (event: MediaQueryListEvent) => {
    setDarkMode(event.matches);
};

/**
 * 获取主题模式
 * @returns 主题模式
 */
export const getThemeMode = (): ThemeMode => {
    let theme = localStorage.getItem("theme") as ThemeMode | null;
    // 如果没有设置主题，则根据系统偏好设置 
    return theme ?? "auto";
};

/**
 * 切换主题
 * @param theme 主题模式
 */
export const changeTheme = (theme: ThemeMode) => {
    try {
        // store config
        localStorage.setItem("theme", theme)
    } catch (error) {
        console.error("切换主题失败", error);
    }

    if (theme === "auto") {
        setDarkMode(darkModeQuery.matches);
        darkModeQuery.addEventListener("change", darkModeChangeEvent);
    } else {
        setDarkMode(theme === "dark");
        darkModeQuery.removeEventListener("change", darkModeChangeEvent);
    }
};

/**
 * 以响应式的方式处理主题模式
 * @returns 主题模式
 */
export const useThemeMode = () => {
    const themeMode = ref<ThemeMode>(getThemeMode());
    watch(
        themeMode,
        (newTheme) => {
            changeTheme(newTheme);
        },
        { immediate: true },
    );
    return themeMode;
};
