
--用户信息表
--2022-2-16 梁加鹏
create table user(
    id int primary key auto_increment ,
    username varchar (16) not null ,
    password varchar (128) not null ,
    nickname varchar (50) not null ,
    active boolean default 1,
    superuser boolean default 0
);

create unique index idx_user_username on user (username);

--代办信息表
--2122-2-16 liangjiapeng
create table todo(
    id int primary key auto_increment ,
    title varchar (100) not null ,
    description varchar (255) not null ,
    priority varchar (25) not null ,
    finished_at timestamp,
    created_at timestamp default current_timestamp ,
    user_id int not null,
    foreign key (user_id) references user (id)
);

-- 2022-2-16 zengsun init database

-- 2021-11-3 添加头像字段
alter table user add column avatar varchar(255);