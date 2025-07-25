<template>
  <section class="about-page">
    <div class="container">
      <h2 class="section-title">About FrontendKit</h2>
      <p>
        <strong>FrontendKit</strong> is designed to accelerate modern frontend development, offering a robust foundation with clean code, flexible components, and a focus on developer experience.
      </p>
      <p>
        Built from practical experience and a commitment to quality, this kit empowers teams to create beautiful, maintainable interfaces efficiently.
      </p>
      <p>
        <strong>No setup required:</strong> Start using FrontendKit right away—no complicated configuration or prerequisites. It's designed to be easy and ready out of the box.
      </p>

      <h3>Special Thanks</h3>
      <div class="thanks-box">
      <p>
        This project wouldn’t be what it is without the design support and visual guidance
        of <strong>Ahsan Shabbir</strong> — a dear friend and like a brother to me.
      </p>
      <p>
        He contributed his talent selflessly, without expecting anything in return. His eye for
        detail and dedication helped shape the look and feel of this kit.
      </p>
      <blockquote>"Some contributions are priceless — because they come from the heart." ❤️</blockquote>
    </div>

      <h3>Project Credits</h3>
      <ul class="credits">
        <li><strong>Development:</strong> Usman Ali Jutt</li>
        <li><strong>Design:</strong> Ahsan Shabbir</li>
      </ul>
    </div>
  </section>
</template>

<script setup>
// No logic needed for static About Us page
</script>

<style scoped>
.about-page {
  font-family: sans-serif;
  color: #333;
}
.about-page .container {
  max-width: 800px;
  margin: 0 auto;
}
.about-page h2,
.about-page h3 {
  color: #222;
  margin-bottom: 10px;
}
.about-page p {
  line-height: 1.7;
  margin-bottom: 15px;
}
.thanks-box {
  background: #fff;
  border-left: 4px solid #4caf50;
  padding: 20px;
  margin-bottom: 30px;
}
blockquote {
  font-style: italic;
  color: #666;
  border-left: 3px solid #ccc;
  padding-left: 15px;
  margin: 15px 0;
}
.credits {
  list-style: none;
  padding: 0;
}
.credits li {
  margin-bottom: 8px;
}
strong{
    font-weight: 600;
}
.section-title{
  color: rgb(70, 70, 70); font-family: 'Samsung Sharp Sans Bold';
  letter-spacing: 1.1px;
}
</style>
