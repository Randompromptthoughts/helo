update posts
set content = ${content}
where id = ${id};

select id, title, img, content, author_id
from posts
where id = ${id};