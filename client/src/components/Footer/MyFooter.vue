<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-top-container">
        <div>
          <img
            src="https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/home-2-client-5.png"
            alt="footer image"
            class="footer-top-section-img"
          />
        </div>

        <div class="footer-top-section-text-container">
          <p class="footer-top-section-text">
            Stay in touch with Books App, follow us on social media and learn
            about new promotions.
          </p>
        </div>

        <div class="footer-top-section-icons-container">
          <a
            href="https://ru-ru.facebook.com/"
            class="footer-top-section-icons-link"
          >
            <i class="pi pi-facebook"></i>
          </a>

          <a
            href="https://twitter.com/?lang=ru"
            class="footer-top-section-icons-link"
          >
            <i class="pi pi-twitter"></i>
          </a>
          <a href="https://discord.com/" class="footer-top-section-icons-link">
            <i class="pi pi-discord"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <div>
          <div>
            <div>
              <div>
                <p class="footer-bottom-text">
                  ©
                  {{ new Date().getFullYear() }}
                  {{ "Polina Vasilevich".toUpperCase() }}
                  <!-- <a
                    href="https://qodeinteractive.com"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    >QODE INTERACTIVE</a
                  >, ALL RIGHTS RESERVED -->
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footer {
}
.footer-top {
  padding: 70px 4%;
  position: relative;
  background-color: #282828;
  border-top: 0 solid #e1e1e1;
  box-sizing: border-box;

  .footer-top-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .footer-top-section-img {
      filter: invert(100%);
    }

    .footer-top-section-title {
      margin: 0;
      color: #fff;
      font-weight: 500;
      letter-spacing: 0.01em;
      word-wrap: break-word;
    }
    .footer-top-section-text {
      margin-top: 25px;
      text-align: center;
      font-size: 1.1rem;
      color: #c4c4c4;
    }

    .footer-top-section-icons-link {
      margin-right: 20px;
    }

    .pi {
      color: #c4c4c4;
      font-size: 1.5rem;

      &:hover {
        color: #e9ecef;
      }
    }
  }
}

.footer-bottom {
  position: relative;
  display: inline-block;
  width: 100%;
  vertical-align: middle;
  background-color: #000;
  border-top: 0 solid #e1e1e1;
  box-sizing: border-box;
  text-align: center;

  .footer-bottom-inner {
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer-bottom-text {
    margin: 0;
    color: #fff;
    font-family: "Josefin Sans", sans-serif;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.35em;
  }
}
</style>
