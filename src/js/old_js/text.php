
<?php



/*

http://vk.com/pages?oid=-1&p=likes.getList
http://habrahabr.ru/post/177641/
https://api.facebook.com/method/fql.query?query=select%20total_count,like_count,comment_count,share_count,click_count%20from%20link_stat%20where%20url=%27http://uchebnik.mos.ru/ui/landing/%27&format=json

http://www.fabiobiondi.com/blog/2012/10/export-and-save-a-screenshot-of-an-html5-canvas-using-php-jquery-and-easeljs/
http://www.createjs.com/tutorials/HitTest/
function get_fb_likes($url)
{
  $query = "select total_count,like_count,comment_count,share_count,click_count from link_stat where url='{$url}'";
   $call = "https://api.facebook.com/method/fql.query?query=" . rawurlencode($query) . "&format=json";

  $ch = curl_init();
   curl_setopt($ch, CURLOPT_URL, $call);
   curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
   $output = curl_exec($ch);
   curl_close($ch);
   return json_decode($output);
}

$fb_likes = reset( get_fb_likes("http://www.cnn.com") );
echo $fb_likes->total_count;
echo $fb_likes->like_count;
echo $fb_likes->comment_count;
echo $fb_likes->share_count;
echo $fb_likes->click_count;
*/
?>