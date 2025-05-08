declare global {
    namespace User {
        /**
 * Состояние авторизации пользователя.
 *
 * Используется для хранения текущей сессии пользователя, включая токены доступа и параметры безопасности.
 * Это состояние должно быть очищено при выходе пользователя или при завершении сессии.
 *
 * @property accessToken Краткоживущий JWT или другой токен, используемый для авторизации API-запросов.
 *                       Обычно сохраняется в памяти или sessionStorage.
 *
 * @property refreshToken Долгоживущий токен, используемый для получения нового `accessToken` при его истечении.
 *                        Обычно хранится в HttpOnly cookie или другом безопасном месте.
 */
        interface AuthState {
            accessToken: string | null;
            refreshToken: string | null;
        }


        /**
 * Состояние профиля пользователя.
 *
 * Представляет расширенные персональные данные, отображаемые в интерфейсе и используемые для настройки пользовательского опыта.
 * Используется после успешной аутентификации. Может частично обновляться независимо от `AuthState`.
 *
 * @property id Уникальный идентификатор пользователя (обычно UUID или числовой ID).
 * @property username Отображаемое имя пользователя в интерфейсе.
 * @property email Электронная почта, привязанная к аккаунту. Используется для связи и аутентификации.
 * @property phoneNumber (опционально) Номер телефона пользователя. Может использоваться для двухфакторной аутентификации или уведомлений.
 * @property language Язык пользовательского интерфейса (например, `'en'`, `'ru'`).
 * @property profilePicture (опционально) URL изображения профиля. Может быть абсолютным или относительным.
 *
 * @property activity Вспомогательная информация об активности пользователя.
 * - `lastLogin`: Последняя дата и время входа в систему (ISO-строка или формат `YYYY-MM-DDTHH:mm:ssZ`).
 *
 * @property social (опционально) Данные социальной активности пользователя.
 * - `friendsList`: Список ID пользователей, с которыми установлены дружеские отношения.
 * - `blockedUsers`: Список ID пользователей, заблокированных данным пользователем.
 * - `followers`: Список ID подписчиков (однонаправленные связи).
 *
 * @property bio (опционально) Краткая биография пользователя, отображаемая в профиле.
 */
        interface ProfileState {
            id: string;
            username: string;
            email: string;
            phoneNumber?: string;
            language: string;
            profilePicture?: string;

            activity: {
                lastLogin: string;
            };

            social?: {
                friendsList: string[];
                blockedUsers: string[];
                followers: string[];
            };

            bio?: string;
        }
    }

    namespace Product {
        /**
     * Продукт каталога.
     *
     * Представляет собой товарную единицу, отображаемую в списках и карточках.
     * Привязан к категории через `categoryId`, может содержать дополнительные атрибуты.
     *
     * @property id Уникальный идентификатор продукта.
     * @property name Название продукта.
     * @property description (опционально) Описание продукта, отображаемое в интерфейсе.
     * @property quantity Количество продукта на складе.
     * @property price Цена за единицу товара.
     * @property unitcost Единица товара (/кг, /100г, /1 шт.)
     * @property manufacturer (опционально) Название производителя.
     * @property imageUrl (опционально) Ссылка на изображение продукта.
     * @property categoryId ID категории, к которой относится продукт.
     */
        interface Product {
            id: string;
            name: string;
            description?: string;
            quantity: number;
            price: number;
            unitcost?: string;
            manufacturer?: string;
            imageUrl?: string;

            categoryId: string;
        }

        /**
     * Категория товаров.
     *
     * Используется для организации каталога в древовидную структуру.
     * Категории могут быть вложенными через `parentId`.
     *
     * @property id Уникальный идентификатор категории.
     * @property name Название категории, отображаемое в интерфейсе.
     * @property parentId (опционально) ID родительской категории (если является подкатегорией).
     */
        interface Category {
            id: string;
            name: string;
            parentId?: string;
        }

        /**
     * Состояние каталога продуктов.
     *
     * Представляет данные каталога в нормализованной форме, включая категории, продукты, фильтры и выбор.
     * Используется для отображения списка товаров, дерева категорий, поиска и управления.
     *
     * @property categories Список всех категорий (включая корневые и вложенные).
     * @property products Список всех продуктов, сгруппированных по категориям через `categoryId`.
     *
     * @property selectedCategoryId (опционально) ID выбранной категории.
     * @property selectedProductId (опционально) ID выбранного продукта.
     *
     * @property filters Активные фильтры в интерфейсе:
     * - `searchQuery`: Строка поиска.
     *
     * @property metadata Вспомогательная информация:
     * - `lastUpdated`: Дата последнего обновления каталога (ISO).
     * - `totalCount`: Общее количество продуктов, соответствующих фильтрам.
     */
        interface ProductsCatalogState {
            categories: Category[];
            products: Product[];

            selectedCategoryId?: string;
            selectedProductId?: string;

            filters: {
                searchQuery: string;
            };

            metadata: {
                lastUpdated: string;
                totalCount: number;
            };
        }
    }
}

export { }