import Link from 'next/link'
import Footer from '../components/layout/footer'

export default function GuidePage() {
	return (
		<div className='flex flex-col h-screen'>
			<header className='flex items-center pt-5 justify-between'>
				<h1 className='logo text-primary font-semibold'>DODO PIZZA</h1>
				<h1 className=' text-[40px] text-gray-700 font-semibold'>
					Справочная система
				</h1>
			</header>
			<span className='block my-4 border-t border-orange-gray-50' />
			<div className='flex-grow guide text-xl leading-8'>
				<h2>1 Регистрация и авторизация </h2>
				<h2>1.1 Регистрация </h2>
				<p>
					Если у вас нет учетной записи, перейдите на страницу авторизации,
					нажмите зарегистрироваться и заполните необходимую информацию, такую
					как имя, телефон, адрес электронной почты и пароль
				</p>
				<h2>1.2 Авторизация </h2>
				<p>
					Если у вас уже есть учетная запись, перейдите на страницу авторизации,
					введите свой номер телефона и пароль, нажмите кнопу <i>Войти</i>
				</p>
				<h2>2 Формирование заказа</h2>
				<h2>2.1 Добавление в корзину</h2>
				<p>
					Перейдите на главную страницу, выберите товар и добавьтего его в
					корзину, указав дополнтельные опции, если они доступны
				</p>
				<h2>2.2 Оформление заказа</h2>
				<p>
					Перейдите в корзину, укажите адрес доставки и нажмите кнопку{' '}
					<i>Оформить заказ</i>
				</p>
				<h2>3 Общение в чате с технической поддержкой</h2>
				<h2>3.1 Создание обращения</h2>
				<p>
					Перейдите в личный кабинет, во вкладке <i>Заказы</i> выберите заказ, с
					которым вам необходима помощь, нажмите <i>Создать тикет</i>
				</p>
				<h2>3.2 Чат</h2>
				<p>
					Чтобы перейти к чату с технической поддержкой, нажмите{' '}
					<i>
						Тикет {'('}номер обращения{')'}
					</i>
					. Введите сообщение, нажмите <i>Отправить</i>. Чтобы отправить
					изображение, нажмите кнопку, расположенную снизу слева интерфейса
					обращения
				</p>
				<h2>3.3 Решение обращения</h2>
				<p>
					Администраторы могут отвечать на новые обращения и закрывать их.
					Перейдите в личный кабинет, во вкладке <i>Тикеты</i> выберите новое
					обращение и нажмите <i>Решить тикет</i>, затем перейдите на страницу с
					обращением. Чтобы закрыть обращение нажмите <i>Закрыть тикет</i>
				</p>
				<h2>4 Редактирование учетной записи</h2>
				<p>
					Перейдите в личный кабинет, во вкладке <i>Профиль</i> введите новую
					информацию об аккаунте и нажмите <i>Сохранить</i>
				</p>
				<h2>5 Ведение справочников</h2>
				<h2>5.1 Категории</h2>
				<p>
					Администраторы могут добавлять, редактировать и удалять информацию о
					категориях. Перейдите в личный кабинет, во вкладке <i>Категории</i>{' '}
					введите название новой категории и нажмите <i>Добавить</i>. Чтобы
					изменить запись, выберите ее из списка, введите новое название записи
					и нажмите <i>Изменить</i>. Чтобы удалить запись, выберите ее из списка
					и нажмите кнопку удаления, подтвердите действие
				</p>
				<h2>5.2 Дополнительные ингредиенты</h2>
				<p>
					Администраторы могут добавлять, редактировать и удалять информацию о
					дополнительных ингредиентах. Перейдите в личный кабинет, во вкладке{' '}
					<i>Допы</i> введите название нового дополнительного ингредиента и
					нажмите <i>Добавить</i>. Чтобы изменить запись, выберите ее из списка,
					введите новое название записи и нажмите <i>Изменить</i>. Чтобы удалить
					запись, выберите ее из списка и нажмите кнопку удаления, подтвердите
					действие
				</p>
				<h2>6 Добавление и редактирование информации</h2>
				<h2>6.1 Пункты меню</h2>
				<p>
					Администраторы могут просматривать и редактировать информацию о
					товарах. Перейдите в личный кабинет, во вкладке <i>Пукнты меню</i>{' '}
					чтобы добавить товар нажмите <i>Добавить</i>, введите подробную
					информацию о товаре и нажмите <i>Добавить</i>. Чтобы редактировать
					информацию о товаре во вкладке <i>Пункты меню</i> выберите товар,
					введите новую подробную информацию и нажмите <i>Сохранить</i>. Чтобы
					удалить товар нажмите кнопку удаления, подтвердите действие
				</p>
				<h2>6.2 Пользователи</h2>
				<p>
					Администраторы могут просматривать и редактировать информацию о
					пользователях. Перейдите в личный кабинет, во вкладке{' '}
					<i>Пользователи</i> чтобы редактировать информацию о записи выберите
					пользователя, введите новую информацию и нажмите <i>Сохранить</i>
				</p>
				<h2>6.3 Заказы</h2>
				<p>
					Администраторы могут просматривать информацию о заказах. Перейдите в
					личный кабинет, во вкладке <i>Заказы</i> выведена таблица с заказами
					клиентов
				</p>
				<h2>7 Формирование выходных документов</h2>
				<h2>7.1 Товарный чек</h2>
				<p>
					Администраторы могут формировать товарный чек заказа. Перейдите в
					личный кабинет, во вкладке <i>Заказы</i> выберите заказ и нажмите{' '}
					<i>Печать</i>
				</p>
				<h2>7.2 Сводный отчет о заказах клиента</h2>
				<p>
					Администраторы могут формировать сводный отчет о заказах клиента.
					Перейдите в личный кабинет, во вкладке <i>Пользователи</i> выберите
					пользователя и нажмите <i>Сводный отчет о заказах</i>
				</p>
				<h2>7.3 Сводный отчет о заказах клиента</h2>
				<p>
					Администраторы могут формировать отчет о закрытых тикетах
					администратора. Перейдите в личный кабинет, во вкладке{' '}
					<i>Пользователи</i> выберите администратора и нажмите{' '}
					<i>Отчет о закрытых тикетах</i>
				</p>
				<h2>8 Логирование</h2>
				<p>
					Администраторы могут просматривать информацию о входах пользователей.
					Перейдите в личный кабинет, во вкладке <i>Пользователи</i> нажмите{' '}
					<i>Логи</i>
				</p>
				<h2>9 База данных</h2>
				<h2>9.1 Резервное копирование</h2>
				<p>
					Администраторы могут сохранять файл базы данных. Перейдите в личный
					кабинет, во вкладке <i>Профиль</i> нажмите <i>Экспорт базы данных</i>
				</p>
				<h2>9.2 Восстановление</h2>
				<p>
					Администраторы могут загружать файл базы данных. Перейдите в личный
					кабинет, во вкладке <i>Профиль</i> нажмите <i>Импорт базы данных</i>
				</p>
			</div>
			<Footer />
		</div>
	)
}
